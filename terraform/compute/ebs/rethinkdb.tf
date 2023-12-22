resource "aws_ebs_volume" "rethinkdb_data" {
  availability_zone = "us-east-1d"
  size              = 2

  tags = {
    Name = "rethinkdb-data"
  }
}
