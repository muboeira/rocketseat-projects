/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceReduced = this.transactions.reduce(
      (balance, transaction) => {
        if (transaction.type === 'income') {
          balance.income += transaction.value;
          balance.total += transaction.value;
        }
        if (transaction.type === 'outcome') {
          balance.outcome += transaction.value;
          balance.total -= transaction.value;
        }
        return balance;
      },
      { outcome: 0, income: 0, total: 0 },
    );

    return balanceReduced;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
