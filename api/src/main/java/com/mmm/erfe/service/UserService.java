package com.mmm.erfe.service;

import com.mmm.erfe.domain.GlobalUser;
import com.mmm.erfe.service.impl.ServiceResponse;

public interface UserService {
    ServiceResponse login(GlobalUser user);
}
