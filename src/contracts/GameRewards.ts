import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export class GameRewards {
  private connection: Connection;
  private gameTokenMint: PublicKey;

  constructor(connection: Connection, gameTokenMint: PublicKey) {
    this.connection = connection;
    this.gameTokenMint = gameTokenMint;
  }

  async rewardPlayer(
    playerPublicKey: PublicKey,
    amount: number,
    gameId: string
  ): Promise<string> {
    try {
      // Create reward transaction
      const transaction = new Transaction();

      // Add reward instruction
      transaction.add(
        // This is a simplified version. In a real implementation,
        // you would use a proper token program instruction
        SystemProgram.transfer({
          fromPubkey: playerPublicKey,
          toPubkey: this.gameTokenMint,
          lamports: amount,
        })
      );

      // Send transaction
      const signature = await this.connection.sendTransaction(transaction, []);
      await this.connection.confirmTransaction(signature);

      return signature;
    } catch (error) {
      console.error('Error rewarding player:', error);
      throw error;
    }
  }

  async getPlayerBalance(playerPublicKey: PublicKey): Promise<number> {
    try {
      const balance = await this.connection.getBalance(playerPublicKey);
      return balance;
    } catch (error) {
      console.error('Error getting player balance:', error);
      throw error;
    }
  }
} 