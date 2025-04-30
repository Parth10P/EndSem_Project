import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const getUserSubmissions = async (username) => {
  const response = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
  const data = await response.json();
  if (data.status !== 'OK') throw new Error('Failed to fetch submissions');
  return data.result;
};

const analyzeProblemTags = (submissions) => {
  const tagCount = {};
  submissions.forEach((sub) => {
    if (sub.verdict === 'OK') {
      sub.problem.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });
  return Object.entries(tagCount).map(([name, value]) => ({ name, value }));
};

const analyzeProblemRatings = (submissions) => {
  const ratingCount = {};
  const seen = new Set();

  submissions.forEach((sub) => {
    if (
      sub.verdict === 'OK' &&
      sub.problem.rating &&
      !seen.has(`${sub.problem.contestId}-${sub.problem.index}`)
    ) {
      ratingCount[sub.problem.rating] = (ratingCount[sub.problem.rating] || 0) + 1;
      seen.add(`${sub.problem.contestId}-${sub.problem.index}`);
    }
  });

  return ratingCount;
};

function UserProblemStats({ handle }) {
  const [tagStats, setTagStats] = useState([]);
  const [ratingStats, setRatingStats] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!handle) return;

    const fetchStats = async () => {
      setLoading(true);
      setError('');
      try {
        const submissions = await getUserSubmissions(handle);
        setTagStats(analyzeProblemTags(submissions));
        setRatingStats(analyzeProblemRatings(submissions));
      } catch (err) {
        setError('Invalid handle or failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [handle]);

  if (!handle) return null;

  const ratingArray = Object.entries(ratingStats)
    .map(([rating, count]) => ({ rating, count }))
    .sort((a, b) => parseInt(a.rating) - parseInt(b.rating));

  return (
    <div id='ProblemSolved' style={{ padding: '24px', borderTop: '1px solid #eee', marginTop: '40px' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>User Problem Stats</h2>

      {loading && <p>Loading stats...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tagStats.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '16px' }}>Tag Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie 
                data={tagStats} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={130} 
                innerRadius={60}
                paddingAngle={2}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={{ stroke: '#8884d8', strokeWidth: 1 }}
                animationDuration={1500}
                animationBegin={200}
              >
                {tagStats.map((entry, index) => (
                  <Cell 
                    key={entry.name} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="#0d1117" 
                    strokeWidth={1} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} problems`, name]}
                contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '8px' }}
                itemStyle={{ color: '#c9d1d9' }}
              />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {ratingArray.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '16px' }}>Rating Breakdown</h3>

          {/* Rating Boxes */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px', justifyContent: 'center' }}>
            {ratingArray.map(({ rating, count }) => (
              <div
                key={rating}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #30363d',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  backgroundColor: '#161b22',
                  color: '#c9d1d9',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {rating}: {count}
              </div>
            ))}
          </div>

          {/* Rating Bar Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={ratingArray}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="rating" 
                label={{ value: 'Problem Rating', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                allowDecimals={false} 
                label={{ value: 'Problems Solved', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => [`${value} problems`, 'Solved']}
                labelFormatter={(rating) => `Rating: ${rating}`}
                contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '8px' }}
                itemStyle={{ color: '#c9d1d9' }}
              />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Problems Solved" 
                fill="#58a6ff" 
                radius={[6, 6, 0, 0]} 
                animationDuration={1500}
                animationBegin={200}
              >
                {ratingArray.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${210 + index * 15}, 100%, 65%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default UserProblemStats;
