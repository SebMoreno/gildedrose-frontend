# Creating Public Security Group
resource "aws_security_group" "jenkins_server_ec2_sg" {
  name        = var.sg_name
  description = var.sg_description
  vpc_id      = var.vpc_id
  tags        = var.sg_tags

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
    cidr_blocks = [var.allowed_cidr_for_sg]
  }

  ingress {
    description = "jenkins"
    from_port   = 8080
    to_port     = 8080
    protocol    = "TCP"
    cidr_blocks = [var.allowed_cidr_for_sg]
  }

  ingress {
    description = "backend_api"
    from_port   = 9090
    to_port     = 9090
    protocol    = "TCP"
    cidr_blocks = [var.allowed_cidr_for_sg]
  }

  ingress {
    description = "db"
    from_port   = 5432
    to_port     = 5432
    protocol    = "TCP"
    cidr_blocks = [var.allowed_cidr_for_sg]
  }

  egress {
    from_port   = 0
    protocol    = "-1" # open all out rule
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}
