import React from 'react';

const Feed = () => {
  // Sample updates for new users
  const feedItems = [
    {
      id: 1,
      title: 'Welcome to Expense Tracker!',
      description: 'Get started by setting up your first budget. Explore our intuitive interface to categorize your expenses and set savings goals.',
      timeAgo: 'Just now',
    },
    {
      id: 2,
      title: 'Connect Your Bank Accounts',
      description: 'Sync your bank accounts to automatically track your spending and view detailed insights. It’s quick and easy!',
      timeAgo: '1 hour ago',
    },
    {
      id: 3,
      title: 'Explore Expense Categories',
      description: 'Take a moment to review and customize your expense categories. This will help you get a clearer picture of your spending habits.',
      timeAgo: '3 hours ago',
    },
    {
      id: 4,
      title: 'Set Your Savings Goals',
      description: 'Start setting up savings goals to track your progress and stay motivated. Achieve your financial targets with ease.',
      timeAgo: '1 day ago',
    },
  ];

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-teal-600">Getting Started with Your Expense Tracker</h2>
      <div className="space-y-4">
        {feedItems.map((item) => (
          <div key={item.id} className="bg-teal-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-teal-500">{item.title}</h3>
            <p className="text-gray-800 mb-2">{item.description}</p>
            <p className="text-sm text-gray-500">{item.timeAgo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
