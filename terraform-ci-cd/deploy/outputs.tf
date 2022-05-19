output "public_ip_jenkins" {
  description = "public ip address of jenkins server"
  value       = module.deploy_ec2.public_ip_jenkins
}

output "public_dns_jenkins" {
  description = "public dns address of jenkins server"
  value       = module.deploy_ec2.public_dns_jenkins
}

output "rds_hostname" {
  description = "rds hostname"
  value       = module.deploy_ec2.rds_hostname
}

output "rds_port" {
  description = "rds port"
  value       = module.deploy_ec2.rds_port
}