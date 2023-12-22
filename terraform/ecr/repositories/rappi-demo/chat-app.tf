resource "aws_ecr_repository" "rappi_chat_app" {
  name                 = "rappi-demo/chat-app"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
