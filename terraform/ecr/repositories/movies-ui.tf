resource "aws_ecr_repository" "atelier_movies" {
  name                 = "atelier/movies"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
