function FindProxyForURL(url, host) {
            var privateIP = /^(0|10|127|192\.168|172\.1[6789]|172\.2[0-9]|172\.3[01]|169\.254|192\.88\.99)\.[0-9.]+$/;
            var resolved_ip = dnsResolve(host);
            var block = "BLOCK";
            /* Don't send non-FQDN or private IP auths to us */
            if (isPlainHostName(host) || isInNet(resolved_ip, "192.0.2.0","255.255.255.0") || privateIP.test(resolved_ip))
            return "DIRECT";
            /* FTP goes directly */
            if (url.substring(0,4) == "ftp:")
            return "DIRECT";
            
            /* test with ZPA*/
            if (isInNet(resolved_ip, "100.64.0.0","255.255.0.0"))
            return "DIRECT";
            
            if (shExpMatch(host, "*.dx.com") ||
        shExpMatch(host, "*.dxcdn.com") ||
        shExpMatch(host, "*google*"))
                return "DIRECT";
      
      
            if ((shExpMatch(host, "www.neverssl.com")) ||
                (shExpMatch(host, "portquiz.net")))
                return block;
                
            
          
            /* Updates are directly accessible */
            if (((localHostOrDomainIs(host, "trust.zscaler.com")) ||
                    (localHostOrDomainIs(host, "trust.zscaler.net")) ||
                    (localHostOrDomainIs(host, "trust.zscalerone.net")) ||
                    (localHostOrDomainIs(host, "trust.zscalertwo.net")) ||
                    (localHostOrDomainIs(host, "trust.zscloud.net")) ) &&
                (url.substring(0,5) == "http:" || url.substring(0,6) == "https:"))
            return "DIRECT";
            /* Default Traffic Forwarding. Forwarding to Zen on port 80, but you can use port 9400 also */
        return "PROXY 165.225.122.14:80; PROXY 165.225.120.14:80; DIRECT";
        //   return "DIRECT";
        }
