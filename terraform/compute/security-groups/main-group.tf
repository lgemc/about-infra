resource "aws_security_group" "main_security_group" {
  name        = "main-sg"
  vpc_id      = var.main_vpc_id
  description = "Main security group"
  ingress {
    description      = "Allow ssh"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    description = "EFS mount target"
    from_port   = 2049
    to_port     = 2049
    protocol    = "tcp"
    cidr_blocks = ["192.168.0.0/28"]
  }



  ingress {
    description      = "Allow http"
    from_port        = 0
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description = "Allow k3s server join"
    from_port   = 0
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["192.168.0.0/28"]
  }

  egress {
    description = "Allow k3s server join"
    from_port   = 0
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["192.168.0.0/28"]
  }

  ingress {
    description      = "Allow metrics server" # for more information see https://stackoverflow.com/questions/69221003/k3s-metrics-server-doesnt-work-for-worker-nodes
    from_port        = 0
    to_port          = 10250
    protocol         = "tcp"
    cidr_blocks      = ["192.168.0.0/28"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "Allow kubectl"
    from_port        = 0
    to_port          = 6443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    description      = "Allow etcd"
    from_port        = 0
    to_port          = 2379
    protocol         = "tcp"
    cidr_blocks      = ["192.168.0.0/28"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "Allow etcd"
    from_port        = 0
    to_port          = 2379
    protocol         = "tcp"
    cidr_blocks      = ["192.168.0.0/28"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    description      = "Allow install packages"
    from_port        = 0
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0", "192.168.0.0/28"]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "Allow intra node communications"
    from_port        = 0
    to_port          = 0
    protocol         = "tcp"
    cidr_blocks      = ["192.168.0.0/28"]
    ipv6_cidr_blocks = ["::/0"]
  }
  egress {
    description      = "Allow intra node communications"
    from_port        = 0
    to_port          = 0
    protocol         = "tcp"
    cidr_blocks      = ["192.168.0.0/28"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

output "main_security_group_id" {
  value = aws_security_group.main_security_group.id
}
