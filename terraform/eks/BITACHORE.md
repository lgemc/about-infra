# Eks

Elastic kubernetes service by AWS.

## Getting started

See [this link](https://aws.amazon.com/getting-started/hands-on/deploy-kubernetes-app-amazon-eks/)

## Concepts

kubectl
eksctl
AWS Cli
terraform

## Eks ctl

Under the hood it uses cloud formation stack where creates next elements

- Control plane
- Security group
- Pod execution role
- Ingress node groups
- Internet gateway
- NAT gateway
- Nat ip 
Policy cloudwatch metric
- Elb permisoin
- Routetable
- Subnet route
- Roles
- VPC
- VPCGateway attachment

# Encripting config

Encription can be performed via kms

Cluster configs to perform encription and decription should be performed via cluster config

Also see [next video](https://www.eksworkshop.com/docs/security/sealed-secrets/)

# Side notes

- Creation takes a while, most slow creation process is control plane one
- Max elastic ip are 5, if some resource fails on creation like elastic ip,
process get restarted and rollbacked without advice at eks cli, you should
see what happen at aws console

# Throubleshooting

- Create ebs storage class failed on fargate cluster

supplied via the AWS_REGION environment variable." err="did not find aws instance ID in node providerID string"
panic: did not find aws instance ID in node providerID string

Fix:

If helm charts are used and kustimize is used, at values exists a var called `region`, you should setup it propertly

- EBS controller failed

Check that your eks can handle ebs management via iam, see [next link](https://repost.aws/knowledge-center/eks-persistent-storage)

You need to create a policy allowing ebs management, next create a trust policy to allow eks oidc asume a role
binded to this policy

Also you need to associate iam oidc provider to your cluster

```bash
eksctl utils associate-iam-oidc-provider --cluster aimo --approve
```
## About eks fargate vs eks ec2

- Fargate is more expensive than ec2 without correct configurations
- EBS is not supported at fargate clusters, you should use EFS
- Daemonsets are not supported at fargate, you should re engineering your app 

## About sealed secrets

Without `--scpoe cluster-wide` sealing secrets will end in failure

Prever run `kubeseal --scope cluster-wide --cert=crt.pem --format=yaml < secret-file.yaml > sealedsecret-out.yaml` 

For more information see next link [https://github.com/bitnami-labs/sealed-secrets/issues/480]()


