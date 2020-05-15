package com.mmm

import grails.plugin.cache.Cacheable
import grails.transaction.Transactional

@Transactional
class SecurityService {

    @Transactional(readOnly = true)
    @Cacheable(value = 'securityRole')
    def getPermissionList(Long userId) {
        if (!userId) {
            return null
        } else {
            return IcsUser.get(userId)?.roles?.code
        }
    }
}
