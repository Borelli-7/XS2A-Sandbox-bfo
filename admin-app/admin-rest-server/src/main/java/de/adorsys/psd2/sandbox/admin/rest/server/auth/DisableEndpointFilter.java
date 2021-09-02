package de.adorsys.psd2.sandbox.admin.rest.server.auth;


import de.adorsys.psd2.sandbox.admin.rest.api.resource.AdminBaseRestApi;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class DisableEndpointFilter extends OncePerRequestFilter {
    private static final Map<String, Pair<String, String>> DISABLED_MAP;
    private static final AntPathMatcher matcher = new AntPathMatcher();
    private final Environment env;

    static {
        /*
          DISABLED_MAP STRUCTURE:
          |RequestUri to block| Pair of <Application properties variable, Message to send> |
          Adding only RequestUri and Message will block by Uri, adding all 3 parameter will only block uri if application property is set to true.
         */
        DISABLED_MAP = Map.of(
                AdminBaseRestApi.BASE_PATH + "/register", Pair.of("app.endpoints.admin.self.registration.disabled", "Self Registration is Disabled by Administration.")
        );
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        Optional<String> isDisabled = DISABLED_MAP.keySet().stream()
                                          .filter(u -> matcher.match(request.getServletPath(), u)).findFirst();
        if (isDisabled.isPresent()) {
            String u = isDisabled.get();
            Pair<String, String> o = DISABLED_MAP.get(u);
            if (isDisabled(o.getKey())) {
                String msg = Optional.ofNullable(o.getValue()).orElse("This feature is Disabled by Administration!");
                response.sendError(HttpStatus.FORBIDDEN.value(), msg);
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

    /*
        If Property is not set in the Map - endpoint is considered disabled
        Else have to check the applicationProperties for value
        if not in Properties - endpoint considered enabled
        if Present - endpoint depends on property value
     */
    private boolean isDisabled(String property) {
        return StringUtils.isBlank(property)
                   || Optional.ofNullable(env.getProperty(property, Boolean.class))
                          .orElse(false);
    }
}

