resource "aws_ecr_repository" "rappi_demo_db_setup" {
  name                 = "rappi-demo/db-setup"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
