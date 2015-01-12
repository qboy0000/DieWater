/****************************************************************************
Copyright (c) 2008-2010 Ricardo Quesada
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2011      Zynga Inc.
Copyright (c) 2013-2014 Chukong Technologies Inc.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 ****************************************************************************/
package com.shunchengfeng.DieWater3;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;

import com.google.android.gms.ads.*;

import android.app.ActionBar.LayoutParams;
import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.os.Environment;
import android.view.Gravity;
import android.view.ViewGroup.MarginLayoutParams;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.PopupWindow;

// The name of .so is specified in AndroidMenifest.xml. NativityActivity will load it automatically for you.
// You can use "System.loadLibrary()" to load other .so files.

public class AppActivity extends Cocos2dxActivity {

	public AdView adView;

	static String MY_AD_UNIT_ID = "ca-app-pub-3695369066607397/9316141662";

	private LinearLayout layout;
	private LinearLayout mainLayout;
	boolean adsinited = false;
	private static AppActivity _activity;
	
	private PopupWindow popUp;
	
	static String hostIPAdress = "0.0.0.0";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		_activity = this;
		adView = new AdView(this);
		adView.setAdUnitId(MY_AD_UNIT_ID);
		adView.setAdSize(AdSize.BANNER);

		if (nativeIsLandScape()) {
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
		} else {
			setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
		}
		if (nativeIsDebug()) {
			getWindow().setFlags(
					WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,
					WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
		}
		hostIPAdress = getHostIpAddress();
//
//		// 启动一般性请求。
//		AdRequest adRequest = new AdRequest.Builder().build();
//
//		// 在adView中加载广告请求。
//		adView.loadAd(adRequest);

	}
	
	public static void showAd(){
		_activity._showAdPopup();
	}

	public void _showAdPopup() {
		if (adsinited) {
			return;
		}
		if (adView != null) {
			_activity.runOnUiThread(new Runnable() {
				@Override
				public void run() {
					adsinited = true;
					// Out popup window
					popUp = new PopupWindow(_activity);
					// This is the minimum size for AdMob, we need to set this
					// in case our target device run at 320x480
					// resolution(Otherwise no ad will be shown, see the padding
					// kill below)
					popUp.setWidth(320);
					popUp.setHeight(50);
					popUp.setWindowLayoutMode(LayoutParams.WRAP_CONTENT,
							LayoutParams.WRAP_CONTENT);
					popUp.setClippingEnabled(false);
					layout = new LinearLayout(_activity);
					mainLayout = new LinearLayout(_activity);
					// The layout system for the PopupWindow will kill some
					// pixels due to margins/paddings etc… (No way to remove
					// it), so padd it to adjust
					layout.setPadding(-5, -5, -5, -5);
					MarginLayoutParams params = new MarginLayoutParams(
							LayoutParams.WRAP_CONTENT,
							LayoutParams.WRAP_CONTENT);
					params.setMargins(0, 0, 0, 0);
					layout.setOrientation(LinearLayout.VERTICAL);
					layout.addView(adView, params);
					popUp.setContentView(layout);
					_activity.setContentView(mainLayout, params);// you can get
																	// the
																	// TestDevice
																	// ID from
																	// the
																	// output of
																	// logcat .
					AdRequest adRequest = new AdRequest.Builder()
							.addTestDevice(
									"CE7DCE5945F79BBF863872D5026787EFbuild")
							.build();
					// Enable this if your are testing AdMob, otherwise you'll
					// risk to be banned!
					
					_activity.adView.loadAd(adRequest);
					// Show our popup window
					popUp.showAtLocation(mainLayout, Gravity.BOTTOM, 0, 0);
					popUp.update();
				}
			});
		}
	}

	@Override
	public Cocos2dxGLSurfaceView onCreateView() {
		Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
		// TestCpp should create stencil buffer
		glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);

		return glSurfaceView;
	}

	public String getHostIpAddress() {
		WifiManager wifiMgr = (WifiManager) getSystemService(WIFI_SERVICE);
		WifiInfo wifiInfo = wifiMgr.getConnectionInfo();
		int ip = wifiInfo.getIpAddress();
		return ((ip & 0xFF) + "." + ((ip >>>= 8) & 0xFF) + "."
				+ ((ip >>>= 8) & 0xFF) + "." + ((ip >>>= 8) & 0xFF));
	}

	public static String getLocalIpAddress() {
		return hostIPAdress;
	}

	public static String getSDCardPath() {
		if (Environment.getExternalStorageState().equals(
				Environment.MEDIA_MOUNTED)) {
			String strSDCardPathString = Environment
					.getExternalStorageDirectory().getPath();
			return strSDCardPathString;
		}
		return null;
	}

	@Override
	protected void onPause() {
		adView.pause();
		// TODO Auto-generated method stub
		super.onPause();
	}

	@Override
	protected void onResume() {
		adView.resume();
		// TODO Auto-generated method stub
		super.onResume();
	}

	@Override
	protected void onDestroy() {
		adView.destroy();
		// TODO Auto-generated method stub
		super.onDestroy();
	}

	private static native boolean nativeIsLandScape();

	private static native boolean nativeIsDebug();

}
