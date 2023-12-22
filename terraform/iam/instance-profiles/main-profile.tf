resource "aws_iam_instance_profile" "main_profile" {
  name = "main_instance_profile"
  role = var.kube_node_role_name
}

output "main_instance_profile_name" {
  value = aws_iam_instance_profile.main_profile.name
}
