"use client";
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface Transaction {
  type: 'income' | 'expense';
  description: string;
  amount: number;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    // Load transactions from sessionStorage when the component mounts
    const storedTransactions = sessionStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    // Save transactions to sessionStorage whenever they change
    sessionStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const removeTransaction = (index: number) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const updateTransaction = (index: number, updatedTransaction: Transaction) => {
    setTransactions(transactions.map((transaction, i) => (i === index ? updatedTransaction : transaction)));
    setEditingIndex(null); // Exit edit mode after update
  };

  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((total, item) => total + item.amount, 0);
  const totalExpenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, item) => total + item.amount, 0);
  const profitLoss = totalIncome - totalExpenses;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 py-12 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">Expense Tracker Dashboard</h1>
        
        <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-md">
          <h2 className="text-2xl font-medium mb-4">{editingIndex !== null ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <Formik
            initialValues={
              editingIndex !== null 
                ? transactions[editingIndex] 
                : { type: 'income', description: '', amount: 0 }
            }
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
              if (editingIndex !== null) {
                updateTransaction(editingIndex, values as Transaction);
              } else {
                addTransaction(values as Transaction);
              }
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="type">
                    Type
                  </label>
                  <Field
                    as="select"
                    id="type"
                    name="type"
                    className="block w-full px-3 py-2 border border-gray-600 bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </Field>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="description">
                    Description
                  </label>
                  <Field
                    id="description"
                    name="description"
                    className="block w-full px-3 py-2 border border-gray-600 bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-xs italic mt-1" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="amount">
                    Amount
                  </label>
                  <Field
                    id="amount"
                    name="amount"
                    className="block w-full px-3 py-2 border border-gray-600 bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                  />
                  <ErrorMessage name="amount" component="div" className="text-red-500 text-xs italic mt-1" />
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {editingIndex !== null ? 'Update Transaction' : 'Add Transaction'}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-md">
          <h2 className="text-2xl font-medium mb-4">Transaction List</h2>
          <table className="w-full text-left bg-gray-800 rounded-md">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="px-4 py-2 text-gray-300">Type</th>
                <th className="px-4 py-2 text-gray-300">Description</th>
                <th className="px-4 py-2 text-gray-300">Amount</th>
                <th className="px-4 py-2 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-600">
                  <td className="px-4 py-2">{transaction.type}</td>
                  <td className="px-4 py-2">{transaction.description}</td>
                  <td className="px-4 py-2">${transaction.amount}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-400 hover:underline mr-4"
                      onClick={() => setEditingIndex(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:underline"
                      onClick={() => removeTransaction(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-gray-700 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-medium mb-4">Summary</h2>
          <div className="flex justify-between text-lg">
            <p className="flex-1">Total Income: <span className="font-semibold">${totalIncome}</span></p>
            <p className="flex-1">Total Expenses: <span className="font-semibold">${totalExpenses}</span></p>
            <p className="flex-1">Profit/Loss: <span className={`font-semibold ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>${profitLoss}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
