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
			
			/* Updates are directly accessible */
            if (((localHostOrDomainIs(host, "trust.zscaler.com")) ||
                    (localHostOrDomainIs(host, "trust.zscaler.net")) ||
                    (localHostOrDomainIs(host, "trust.zscalerone.net")) ||
                    (localHostOrDomainIs(host, "trust.zscalertwo.net")) ||
                    (localHostOrDomainIs(host, "trust.zscloud.net")) ) &&
                (url.substring(0,5) == "http:" || url.substring(0,6) == "https:"))
            return "DIRECT";
			//Allowed list of websites//
			
			if (shExpMatch(url, "*.microsoftonline.com*") ||
			    shExpMatch(url, "*.office.com*")||
			    shExpMatch(url, "*.msftauth.net*")||
			    shExpMatch(url, "*.live.com*")||
				shExpMatch(url, "*.microsoftonline-p.com*") ||
				shExpMatch(url, "*.microsoftonline-p.net*") ||
				shExpMatch(url, "*login.microsoft.com*") ||
				shExpMatch(url, "*graph.microsoft.com*"))
				{
            return "DIRECT";
			}
}
