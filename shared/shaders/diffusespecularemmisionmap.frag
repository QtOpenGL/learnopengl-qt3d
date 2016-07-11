#define FP highp

// TODO: Replace with a struct
uniform FP vec3 ka;            // Ambient reflectivity
uniform FP float shininess;    // Specular shininess factor

uniform FP vec3 eyePosition;

uniform sampler2D diffuseTexture;
uniform sampler2D specularTexture;
uniform sampler2D emissionTexture;

varying FP vec3 worldPosition;
varying FP vec3 worldNormal;
varying FP vec2 texCoord;

#pragma include light.inc.frag

void main()
{
	FP vec3 diffuseTextureColor = texture2D( diffuseTexture, texCoord ).rgb;
	FP vec3 specularTextureColor = texture2D( specularTexture, texCoord ).rgb;
	FP vec3 emissionTextureColor = texture2D( emissionTexture, texCoord ).rgb;

	FP vec3 diffuseColor, specularColor;
	adsModel(worldPosition, worldNormal, eyePosition, shininess, diffuseColor, specularColor);

	gl_FragColor = vec4( diffuseTextureColor * ( ka + diffuseColor ) + specularTextureColor * specularColor + emissionTextureColor, 1.0 );
}
