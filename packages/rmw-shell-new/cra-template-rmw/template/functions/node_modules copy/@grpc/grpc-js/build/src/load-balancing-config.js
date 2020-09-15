"use strict";
/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* In these functions we assume the input came from a JSON object. Therefore we
 * expect that the prototype is uninteresting and that `in` can be used
 * effectively */
function validateXdsConfig(xds) {
    if (!('balancerName' in xds) || typeof xds.balancerName !== 'string') {
        throw new Error('Invalid xds config: invalid balancerName');
    }
    const xdsConfig = {
        balancerName: xds.balancerName,
        childPolicy: [],
        fallbackPolicy: [],
    };
    if ('childPolicy' in xds) {
        if (!Array.isArray(xds.childPolicy)) {
            throw new Error('Invalid xds config: invalid childPolicy');
        }
        for (const policy of xds.childPolicy) {
            xdsConfig.childPolicy.push(validateConfig(policy));
        }
    }
    if ('fallbackPolicy' in xds) {
        if (!Array.isArray(xds.fallbackPolicy)) {
            throw new Error('Invalid xds config: invalid fallbackPolicy');
        }
        for (const policy of xds.fallbackPolicy) {
            xdsConfig.fallbackPolicy.push(validateConfig(policy));
        }
    }
    return xdsConfig;
}
function validateGrpcLbConfig(grpclb) {
    const grpcLbConfig = {
        childPolicy: [],
    };
    if ('childPolicy' in grpclb) {
        if (!Array.isArray(grpclb.childPolicy)) {
            throw new Error('Invalid xds config: invalid childPolicy');
        }
        for (const policy of grpclb.childPolicy) {
            grpcLbConfig.childPolicy.push(validateConfig(policy));
        }
    }
    return grpcLbConfig;
}
function validateConfig(obj) {
    if ('round_robin' in obj) {
        if ('xds' in obj || 'grpclb' in obj) {
            throw new Error('Multiple load balancing policies configured');
        }
        if (obj['round_robin'] instanceof Object) {
            return { round_robin: {} };
        }
    }
    if ('xds' in obj) {
        if ('grpclb' in obj) {
            throw new Error('Multiple load balancing policies configured');
        }
        return { xds: validateXdsConfig(obj.xds) };
    }
    if ('grpclb' in obj) {
        return { grpclb: validateGrpcLbConfig(obj.grpclb) };
    }
    throw new Error('No recognized load balancing policy configured');
}
exports.validateConfig = validateConfig;
//# sourceMappingURL=load-balancing-config.js.map