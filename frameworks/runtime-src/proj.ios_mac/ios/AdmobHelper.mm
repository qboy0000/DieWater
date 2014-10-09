//
//  AdmobHelper.cpp
//  MyCppGame
//
//  Created by q on 14-8-3.
//
//

#include "AdmobHelper.h"
#include "AdmobHelper-Interface.h"
#import "GADBannerView.h"
#import "GADRequest.h"
#import "AppController.h"

#define kSampleAdUnitID @"ca-app-pub-3695369066607397/7995589665"

static AdmobHelper* s_AdmobHelper;

void addBarAd(){
    //return;
    if (s_AdmobHelper == NULL) {
        s_AdmobHelper  = [[AdmobHelper alloc] init];
    }
    [s_AdmobHelper addAdBanner];
}

void hidenBarAd(){
    if (s_AdmobHelper == NULL) {
        s_AdmobHelper  = [[AdmobHelper alloc] init];
    }
    [s_AdmobHelper hiddenAdBanner];
}

void releaseBarAd(){
    if (s_AdmobHelper) {
        [s_AdmobHelper release];
        s_AdmobHelper = NULL;
    }
}

@implementation AdmobHelper

-(void)addAdBanner{
    
    UIApplication* app = [UIApplication sharedApplication];
    AppController* appctrl = (AppController*)[app delegate];
    
    UIView* uv =  [appctrl.viewController view];
    //appctrl.viewController
    CGPoint origin;
    
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone){
        origin = CGPointMake(0.0,uv.frame.size.height - kGADAdSizeBanner.size.height);
        if (self.adBanner == NULL) {
            self.adBanner = [[GADBannerView alloc] initWithAdSize:kGADAdSizeBanner origin:origin];
        }
    }else{
        origin = CGPointMake(20.0,uv.frame.size.height - kGADAdSizeLeaderboard.size.height);
        if (self.adBanner == NULL) {
            self.adBanner = [[GADBannerView alloc] initWithAdSize:kGADAdSizeLeaderboard origin:origin];
        }
    }

    
    self.adBanner.adUnitID = kSampleAdUnitID;
    self.adBanner.delegate = self;
    self.adBanner.rootViewController = (UIViewController*)appctrl.viewController;
    [uv addSubview:self.adBanner];
    [self.adBanner setHidden:FALSE];
    [self.adBanner loadRequest:[self request]];
}

-(void)hiddenAdBanner{
    if (self.adBanner) {
        [self.adBanner setHidden:TRUE];
        [self.adBanner removeFromSuperview];
        self.adBanner = NULL;
    }
}

- (GADRequest *)request {
    GADRequest *request = [GADRequest request];
    
    // Make the request for a test ad. Put in an identifier for the simulator as well as any devices
    // you want to receive test ads.
//    request.testDevices = @[
//                            // TODO: Add your device/simulator test identifiers here. Your device identifier is printed to
//                            // the console when the app is launched.
//                            GAD_SIMULATOR_ID
//                            ];
    return request;
}

-(void)dealloc{
    [self hiddenAdBanner];
    [super dealloc];
}

#pragma mark GADBannerViewDelegate implementation

// We've received an ad successfully.
- (void)adViewDidReceiveAd:(GADBannerView *)adView {
    NSLog(@"Received ad successfully");
}

- (void)adView:(GADBannerView *)view didFailToReceiveAdWithError:(GADRequestError *)error {
    NSLog(@"Failed to receive ad with error: %@", [error localizedFailureReason]);
}

@end