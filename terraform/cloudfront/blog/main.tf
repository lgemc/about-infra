// terraform resources to have a static page based on a bucket called lgemc-blog
// based on cloudfront
resource "aws_cloudfront_distribution" "blog" {
  origin {
    domain_name = vars.bucket_regional_domain_name
    origin_id   = vars.bucket_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "lgmc blog"
  price_class         = "PriceClass_100"
  default_root_object = "index.html"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = vars.bucket_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    "Service" = "main"
    "Name"    = "blog"
  }
}
