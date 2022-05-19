resource "aws_security_group" "jenkins_server_ec2_sg" {
  name        = var.ec2_sg_name
  description = var.ec2_sg_description
  tags        = var.ec2_sg_tags
  vpc_id      = var.vpc_id

  ingress {
    description = "frontend"
    from_port   = 80
    to_port     = 80
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "ssh"
    from_port   = 22
    to_port     = 22
    protocol    = "TCP"
    cidr_blocks = [var.allowed_cidr_for_ec2_sg]
  }

  ingress {
    description = "jenkins"
    from_port   = 8080
    to_port     = 8080
    protocol    = "TCP"
    cidr_blocks = [var.allowed_cidr_for_ec2_sg]
  }

  ingress {
    description = "backend_api"
    from_port   = 9090
    to_port     = 9090
    protocol    = "TCP"
    cidr_blocks = [var.allowed_cidr_for_ec2_sg]
  }

  egress {
    from_port   = 0
    protocol    = "-1" # open all out rule
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "db_rds_sg" {
  name        = var.rds_sg_name
  description = var.rds_sg_description
  tags        = var.rds_sg_tags
  vpc_id      = var.vpc_id

  ingress {
    description = "db"
    from_port   = 5432
    to_port     = 5432
    protocol    = "TCP"
    cidr_blocks = [join("/", [aws_instance.jenkins_server.private_ip, "32"])]
  }

  egress {
    from_port   = 0
    protocol    = "-1" # open all out rule
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}