resource "aws_ecr_repository" "rappi_demo_kafka_web_producer" {
  name                 = "rappi-demo/kafka-web-producer"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
