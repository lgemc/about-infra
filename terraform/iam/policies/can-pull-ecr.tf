resource "aws_iam_policy" "can_pull_ecr" {
  name        = "can-pull-ecr"
  path        = "/"
  description = "Allow manage EBS storage"

  policy = jsonencode(
    {
      Version : "2012-10-17",
      Statement : [
        {
          Effect : "Allow",
          Action : [
            "ecr:BatchCheckLayerAvailability",
            "ecr:BatchGetImage",
            "ecr:GetDownloadUrlForLayer",
            "ecr:GetAuthorizationToken"
          ],
          Resource : "*"
        }
      ]
  })
}

output "can_pull_ecr_policy" {
  value = aws_iam_policy.can_pull_ecr.arn
}
