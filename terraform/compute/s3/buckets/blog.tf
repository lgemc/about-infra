resource "aws_s3_bucket" "blog" {
  bucket = "lgmc-blog"
  acl    = "private"
  tags = {
    "Service" = "main"
    "Name"    = "blog"
  }
}
