import React from 'react';
import '../components/leader.css'

function LeaderboardPage() {
  const leaderboardData = [
    {
        rank: 1,
        username: 'TechExplorer',
        points: 2450,
        weeklyGain: 350,
        avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
        rank: 2,
        username: 'CodeNinja',
        points: 2300,
        weeklyGain: 320,
        avatar: 'https://i.pravatar.cc/150?img=4'
    },
    {
        rank: 3,
        username: 'AI_Master',
        points: 2150,
        weeklyGain: 290,
        avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
        rank: 4,
        username: 'CyberWarrior',
        points: 1980,
        weeklyGain: 270,
        avatar: 'https://i.pravatar.cc/150?img=6'
    },
    {
        rank: 5,
        username: 'QuantumDev',
        points: 1820,
        weeklyGain: 250,
        avatar: 'https://i.pravatar.cc/150?img=7'
    },
    {
        rank: 6,
        username: 'ScriptGenius',
        points: 1650,
        weeklyGain: 230,
        avatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
        rank: 7,
        username: 'NeuralCoder',
        points: 1500,
        weeklyGain: 210,
        avatar: 'https://i.pravatar.cc/150?img=9'
    },
    {
        rank: 8,
        username: 'ByteWizard',
        points: 1350,
        weeklyGain: 190,
        avatar: 'https://i.pravatar.cc/150?img=10'
    },
    {
        rank: 9,
        username: 'DebugChamp',
        points: 1200,
        weeklyGain: 170,
        avatar: 'https://i.pravatar.cc/150?img=11'
    }
];


  return (
    <div className="container main h-full w-full mx-auto px-6">
      <h2 className="text-4xl font-bold mb-8 text-center mt-10">Top Listeners This Week 🏆</h2>
      <div className="glass-effect rounded-xl p-8">
        <div className="space-y-6">
          {leaderboardData.map((user, index) => (
            <div key={index} className="leaderboard-item flex items-center justify-between p-4 glass-effect rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-cyan-400">{user.rank}</span>
                <img src={user.avatar} alt={user.username} className="rounded-full w-10 h-10" />
                <span className="font-semibold">{user.username}</span>
              </div>
              <div className="flex items-center space-x-8">
                <span>{user.points} Points</span>
                <span className="text-cyan-400">+{user.weeklyGain} This Week</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;