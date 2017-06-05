package mian.webapp.common.scripts.map.js.supermap.resource.PhoneGap.src.com.supermap.javascript;

import org.apache.cordova.DroidGap;
import org.json.JSONException;

import android.app.ActivityManager;
import android.os.Bundle;

import com.supermap.RequestControl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// �̳���PhoneGap��DroidGap�࣬ʵ��WebView��WebKit���໥ͨ��
public class SuperPhoneActivity extends DroidGap {
	/** Called when the activity is first created. */
    private static Logger log = LoggerFactory.getLogger(SuperPhoneActivity.class);
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setIntegerProperty("splashscreen", R.drawable.splash);

		// ����clouddemo�ļ����µ�indexҳ��
		super.loadUrl("file:///android_asset/www/index.html",
				5000);
		try {
			RequestControl.init(this);
		} catch (JSONException e) {
            log.error("�쳣��", e);
		}
	}

	// PhoneGapȱ�ݣ���Ҫ�ٴ�ǿ���˳����ͷ��ڴ�
	public void onDestroy() {
		finish();
		super.onDestroy();

		ActivityManager activityManger = (ActivityManager) this
				.getSystemService(ACTIVITY_SERVICE);
		try {
			activityManger.restartPackage("com.supermap.javascript");
			activityManger.restartPackage("com.supermap");
			activityManger.restartPackage("com.supermap.plugins");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		System.exit(0);
	}
}