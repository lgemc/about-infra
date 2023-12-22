resource "aws_ecr_repository" "rappi_chat_api" {
  name                 = "rappi-demo/chat-api"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
