resource "aws_instance" "jenkins_server" {
  ami                         = var.ami_id #ami-005de95e8ff495156
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  associate_public_ip_address = var.public_ip
  security_groups             = [aws_security_group.jenkins_server_ec2_sg.id]
  key_name                    = var.key_pair_name
  user_data                   = var.user_data #context where is executed
  tags                        = var.ec2_tags
}