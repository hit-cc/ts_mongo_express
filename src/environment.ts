enum Environments {
  local_environment = "local",
  dev_environment = "dev",
  prod_environment = "prod",
  qa_environment = "qa",
}

class Environment {
  private environment: String;
  private MONGO_CLUSTER_URL =
    "mongodb+srv://cccmongodb:ccc1_mongodb@cc-cluster.tyb3i.mongodb.net/db_ts_mongo_express_local";
  private _MONGO_USER = "cccmongodb";
  private _MONGO_PASS = "ccc1_mongodb";
  private ACCESS_TOKEN_PRIVATE_KEY = "AAFSFR23456789&&&Edfdf";
  private ACCESS_TOKEN_PUBLIC_KEY = "TOPSERCRETFSFR23456789&&&Edfdf";
  constructor(environment: String) {
    this.environment = environment;
  }

  getPort(): Number {
    let port = null;
    this.environment === Environments.prod_environment
      ? (port = 8081)
      : this.environment === Environments.dev_environment
      ? (port = 8082)
      : this.environment === Environments.qa_environment
      ? (port = 8083)
      : (port = 3000);
    return port;
  }

  getDBName(): String {
    let db_name = "";
    this.environment === Environments.prod_environment
      ? (db_name = "db_ts_mongo_express_prod")
      : this.environment === Environments.dev_environment
      ? (db_name = "db_ts_mongo_express_dev")
      : this.environment === Environments.qa_environment
      ? (db_name = "db_ts_mongo_express_qa")
      : (db_name = "db_ts_mongo_express_local");
    return db_name;
  }

  getMongoUser(): string {
    return this._MONGO_USER;
  }

  getMongoPass(): string {
    return this._MONGO_PASS;
  }

  getAccessTokenPrivateKey() {
    return this.ACCESS_TOKEN_PRIVATE_KEY;
  }

  getAccessTokenPublicKey() {
    return this.ACCESS_TOKEN_PUBLIC_KEY;
  }

  getConnectionString() {
    return this.MONGO_CLUSTER_URL;
  }
}

export default new Environment(Environments.local_environment);
