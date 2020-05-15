package springsecurity
//
//
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.context.annotation.Configuration
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
//import org.springframework.security.config.annotation.web.builders.HttpSecurity
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
//import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
///**
// * Nna you will have to read the docs for org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
// * and org.springframework.security.config.annotation.web.builders.HttpSecurity on your own oh. Summary is that is has
// * methods that you can use to configure your security behaviour in Spring security
// */
//@Configuration
//@EnableWebMvcSecurity
//class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//    /**
//     * Injecting the authService the SpringMVC way
//     */
//    @Autowired
//    AuthService authService
//
//    /**
//     * Configures the security behaviour. Read HttpSecurity spring docs for more info
//     * @param httpSecurity
//     * @throws Exception
//     */
//    @Override
//    protected void configure(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity
//                .authorizeRequests()
//                .antMatchers("/auth/**", "/assets/**").permitAll()
//                .antMatchers("/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
//                .anyRequest()
//                .authenticated()
//                .and()
//                .formLogin()
//                .loginPage("/auth/login")
//                .failureUrl("/auth/login?error")
//                .permitAll()
//                .and()
//                .csrf()
//                .disable()
//                .logout()
//                .logoutUrl("/auth/logout")
//                .logoutSuccessUrl("/auth/login?logout")
//                .permitAll()
//    }
//
//    /**
//     * AuthenticationManagerBuilder. Read org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
//     * for more info.
//     * Summary is that you can set inMemoryAuthentication or user a userDetailsService (in my case authService) which fetches
//     * the information from DB. There are more configurations you can do here
//     * @param auth
//     * @throws Exception
//     */
//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth
//                .userDetailsService(authService)
//                .passwordEncoder(new BCryptPasswordEncoder())
//        /*.inMemoryAuthentication()
//        .withUser("user").password("password").roles("USER");*/
//    }
//}