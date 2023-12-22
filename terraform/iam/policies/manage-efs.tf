resource "aws_iam_policy" "manage_efs" {
  name        = "manage-efs"
  path        = "/"
  description = "Allow manage EFS storage"

  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Action" : [
            "elasticfilesystem:DescribeAccessPoints",
            "elasticfilesystem:DescribeFileSystems",
            "elasticfilesystem:DescribeMountTargets",
            "ec2:DescribeAvailabilityZones"
          ],
          "Resource" : "*"
        },
        {
          "Effect" : "Allow",
          "Action" : [
            "elasticfilesystem:CreateAccessPoint"
          ],
          "Resource" : "*"
        },
        {
          "Effect" : "Allow",
          "Action" : "elasticfilesystem:DeleteAccessPoint",
          "Resource" : "*"
        }
      ]

  })
}

output "manage_efs_policy" {
  value = aws_iam_policy.manage_efs.arn
}
