resource "aws_efs_file_system" "main_efs" {
  creation_token = "main-efs"

  tags = {
    Name = "main-efs"
  }
}

resource "aws_efs_mount_target" "mount" {
  file_system_id  = aws_efs_file_system.main_efs.id
  subnet_id       = var.main_subnet_id
  security_groups = [var.main_security_group_id]
}

output "main_efs_file_system_id" {
  value = aws_efs_file_system.main_efs.id
}
