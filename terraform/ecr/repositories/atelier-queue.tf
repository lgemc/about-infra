resource "aws_ecr_repository" "atelier_queue" {
  name                 = "atelier/queue"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
