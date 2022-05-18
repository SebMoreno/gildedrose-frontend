output "public_ip_jenkins" {
  description = "public ip address of jenkins server"
  value       = aws_eip.eip_jenkis_server.public_ip
}

output "public_dns_jenkins" {
  description = "public dns address of jenkins server"
  value       = aws_eip.eip_jenkis_server.public_dns
}