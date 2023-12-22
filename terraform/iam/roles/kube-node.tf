data "aws_iam_policy_document" "instance_assume_role_policy" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "kube_node" {
  name               = "kube-node"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.instance_assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "can_ebs" {
  role       = aws_iam_role.kube_node.name
  policy_arn = var.ebs_manager_policy_arn
}


resource "aws_iam_role_policy_attachment" "can_pull_ecr" {
  role       = aws_iam_role.kube_node.name
  policy_arn = var.can_pull_ecr_policy_arn
}

resource "aws_iam_role_policy_attachment" "can_efs" {
  role       = aws_iam_role.kube_node.name
  policy_arn = var.efs_manager_policy_arn
}

output "kube_node_role_name" {
  value = aws_iam_role.kube_node.name
}
