/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.nifi.minifi.c2.security.authentication;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;

public class C2AnonymousAuthenticationFilter extends AnonymousAuthenticationFilter {
    public static final String ANONYMOUS = "anonymous";

    public C2AnonymousAuthenticationFilter() {
        super(ANONYMOUS);
    }

    @Override
    protected Authentication createAuthentication(HttpServletRequest request) {
        return new C2AuthenticationToken(ANONYMOUS, null, Arrays.asList(new SimpleGrantedAuthority("ROLE_ANONYMOUS")));
    }
}
