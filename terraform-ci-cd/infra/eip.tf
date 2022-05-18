resource "aws_eip" "eip_jenkis_server" {
  instance = aws_instance.jenkins_server.id
  tags     = var.eip_tags
}