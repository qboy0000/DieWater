//
//  AdmobHelper.h
//  MyCppGame
//
//  Created by q on 14-8-3.
//
//

#ifndef __MyCppGame__AdmobHelper__
#define __MyCppGame__AdmobHelper__

#include <iostream>

#import "GADBannerViewDelegate.h"

@class GADBannerView;
@class GADRequest;

@interface AdmobHelper: NSObject<GADBannerViewDelegate>

@property(nonatomic, strong) GADBannerView *adBanner;

- (GADRequest *)request;

-(void)addAdBanner;

-(void)hiddenAdBanner;

@end

#endif /* defined(__MyCppGame__AdmobHelper__) */
