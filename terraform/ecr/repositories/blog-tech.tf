resource "aws_ecr_repository" "blog_tech" {
  name                 = "blog/tech"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
