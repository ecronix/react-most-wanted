import { ChannelControlHelper, LoadBalancer } from './load-balancer';
import { ServiceConfig } from './service-config';
import { LoadBalancingConfig } from './load-balancing-config';
import { SubchannelAddress } from './subchannel';
import { GrpcUri } from './uri-parser';
export declare class ResolvingLoadBalancer implements LoadBalancer {
    private target;
    private channelControlHelper;
    private defaultServiceConfig;
    /**
     * The resolver class constructed for the target address.
     */
    private innerResolver;
    /**
     * Current internal load balancer used for handling calls.
     * Invariant: innerLoadBalancer === null => pendingReplacementLoadBalancer === null.
     */
    private innerLoadBalancer;
    /**
     * The load balancer instance that will be used in place of the current
     * `innerLoadBalancer` once either that load balancer loses its connection
     * or this one establishes a connection. For use when a new name resolution
     * result comes in with a different load balancing configuration, and the
     * current `innerLoadBalancer` is still connected.
     */
    private pendingReplacementLoadBalancer;
    /**
     * This resolving load balancer's current connectivity state.
     */
    private currentState;
    /**
     * The service config object from the last successful resolution, if
     * available. A value of undefined indicates that there has not yet
     * been a successful resolution. A value of null indicates that the last
     * successful resolution explicitly provided a null service config.
     */
    private previousServiceConfig;
    /**
     * The most recently reported connectivity state of the `innerLoadBalancer`.
     */
    private innerBalancerState;
    private innerBalancerPicker;
    /**
     * The most recent reported state of the pendingReplacementLoadBalancer.
     * Starts at IDLE for type simplicity. This should get updated as soon as the
     * pendingReplacementLoadBalancer gets constructed.
     */
    private replacementBalancerState;
    /**
     * The picker associated with the replacementBalancerState. Starts as an
     * UnavailablePicker for type simplicity. This should get updated as soon as
     * the pendingReplacementLoadBalancer gets constructed.
     */
    private replacementBalancerPicker;
    /**
     * ChannelControlHelper for the innerLoadBalancer.
     */
    private readonly innerChannelControlHelper;
    /**
     * ChannelControlHelper for the pendingReplacementLoadBalancer.
     */
    private readonly replacementChannelControlHelper;
    /**
     * The backoff timer for handling name resolution failures.
     */
    private readonly backoffTimeout;
    /**
     * Indicates whether we should attempt to resolve again after the backoff
     * timer runs out.
     */
    private continueResolving;
    /**
     * Wrapper class that behaves like a `LoadBalancer` and also handles name
     * resolution internally.
     * @param target The address of the backend to connect to.
     * @param channelControlHelper `ChannelControlHelper` instance provided by
     *     this load balancer's owner.
     * @param defaultServiceConfig The default service configuration to be used
     *     if none is provided by the name resolver. A `null` value indicates
     *     that the default behavior should be the default unconfigured behavior.
     *     In practice, that means using the "pick first" load balancer
     *     implmentation
     */
    constructor(target: GrpcUri, channelControlHelper: ChannelControlHelper, defaultServiceConfig: ServiceConfig | null);
    private updateResolution;
    private updateState;
    /**
     * Stop using the current innerLoadBalancer and replace it with the
     * pendingReplacementLoadBalancer. Must only be called if both of
     * those are currently not null.
     */
    private switchOverReplacementBalancer;
    private handleResolutionFailure;
    exitIdle(): void;
    updateAddressList(addressList: SubchannelAddress[], lbConfig: LoadBalancingConfig | null): void;
    resetBackoff(): void;
    destroy(): void;
    getTypeName(): string;
    replaceChannelControlHelper(channelControlHelper: ChannelControlHelper): void;
}
