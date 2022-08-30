const { program } = require("commander");
const {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} = require("amazon-cognito-identity-js");

const getIdToken = (cognito, user) => {
  const { userPoolId, clientId } = cognito;
  const userPool = new CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: clientId,
  });

  return new Promise((resolve, reject) => {
    const { username, password } = user;
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    cognitoUser.authenticateUser(
      new AuthenticationDetails({
        Username: username,
        Password: password,
      }),
      {
        onSuccess: (result) => {
          const idToken = result.getIdToken();
          resolve({
            token: idToken.getJwtToken(),
            payload: idToken.payload,
          });
        },
        onFailure: reject,
      }
    );
  });
};

program
  .requiredOption("-u, --username <username>")
  .requiredOption("-p, --password <password>")
  .requiredOption("--client-id <clientId>")
  .requiredOption("--user-pool-id <userPoolId>")
  .option("--token-only")
  .action(async () => {
    const { username, password, clientId, userPoolId, tokenOnly } =
      program.opts();
    const { token, payload } = await getIdToken(
      { clientId, userPoolId },
      { username, password }
    );
    const output = tokenOnly ? token : JSON.stringify({ token, payload });
    process.stdout.write(output);
  });

program.parseAsync().catch((error) => {
  console.error(error);
});
