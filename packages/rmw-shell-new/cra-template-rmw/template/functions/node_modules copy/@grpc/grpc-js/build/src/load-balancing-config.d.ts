export declare type RoundRobinConfig = {};
export interface XdsConfig {
    balancerName: string;
    childPolicy: LoadBalancingConfig[];
    fallbackPolicy: LoadBalancingConfig[];
}
export interface GrpcLbConfig {
    childPolicy: LoadBalancingConfig[];
}
export interface LoadBalancingConfig {
    round_robin?: RoundRobinConfig;
    xds?: XdsConfig;
    grpclb?: GrpcLbConfig;
}
export declare function validateConfig(obj: any): LoadBalancingConfig;
