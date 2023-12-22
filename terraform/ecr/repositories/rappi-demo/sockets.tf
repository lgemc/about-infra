resource "aws_ecr_repository" "rappi_demo_sockets" {
  name                 = "rappi-demo/sockets"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
