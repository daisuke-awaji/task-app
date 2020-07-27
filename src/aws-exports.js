const awsmobile = {
  aws_project_region: "ap-northeast-1",
  aws_cognito_identity_pool_id:
    "ap-northeast-1:4eefbeb6-a846-4bc8-8668-7e0536699871",
  aws_cognito_region: "ap-northeast-1",
  aws_user_pools_id: "ap-northeast-1_R7FtWWQ8g",
  aws_user_pools_web_client_id: "7l9qsc3t1bhp6v76ei2krb777m",
  oauth: {
    domain: "tasks-app-dev.auth.ap-northeast-1.amazoncognito.com",
    scope: [
      "phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: "http://localhost:3000/",
    redirectSignOut: "http://localhost:3000/logout/",
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
};

export default awsmobile;
