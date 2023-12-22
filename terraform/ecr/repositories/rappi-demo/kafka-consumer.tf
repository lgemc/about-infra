resource "aws_ecr_repository" "rappi_demo_kafka_consumer" {
  name                 = "rappi-demo/kafka-consumer"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
