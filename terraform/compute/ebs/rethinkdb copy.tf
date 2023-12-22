resource "aws_ebs_volume" "mi_disquito" {
  availability_zone = "us-east-1d"
  size              = 2

  tags = {
    Name = "demo-rappi"
  }
}
