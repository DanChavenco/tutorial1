import { Db, MongoClient } from 'mongodb';

interface ConnectType {
  db: Db;
  client: MongoClient;
}

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default async function connect(): Promise<ConnectType> {
  //checar se já existe conexão, se não criá-la
  if (!client.isConnected()) await client.connect();

  const db = client.db('Tutorial1');
  return {db, client}
}