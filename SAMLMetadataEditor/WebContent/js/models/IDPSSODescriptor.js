define(
[ 
	'jquery', 
	'underscore', 
	'backbone',
	'models/KeyDescriptor',
	'models/Organization',
	'models/ContactPerson',
	'models/ArtifactResolutionService',
	'models/SingleLogoutService',
	'models/ManageNameIDService',
	'models/NameIDFormat',
	'models/SingleSignOnService',
	'models/NameIDMappingService',
	'models/AssertionIDRequestService',
	'models/AttributeProfile',
	'models/Attribute'
], 
function($, _, Backbone, KeyDescriptor, Organization, ContactPerson, ArtifactResolutionService, SingleLogoutService, ManageNameIDService, NameIDFormat, SingleSignOnService, NameIDMappingService, AssertionIDRequestService, AttributeProfile, Attribute) {

	var options = [
    	{value:"true", name:"True"},
    	{value:"false", name:"False"}
	];
	
	var IDPSSODescriptor = Backbone.Model.extend({
		initialize : function(options){
	        this.parent = (options == null || options.parent == null) ? null : options.parent;
		},
		defaults : function(){
			
			//	 To create a new instace of objects use the return command
			return {
				tag : "md:IDPSSODescriptor",
				name : "IDP SSO Descriptor",
				text : null,
				xml : null,
				childs : [null, [], null, [], [], [], [], [], [], [], [], [], []],
				options : [
		          {value:"md:Extensions", name:"Extensions", disabled : false},
		          {value:"md:KeyDescriptor", name:"Key Descriptor", disabled : false},
		          {value:"md:Organization", name:"Organization", disabled : false},
		          {value:"md:ContactPerson", name:"ContactPerson", disabled : false},
		          {value:"md:ArtifactResolutionService", name:"Artifact Resolution Service", disabled : false},
		          {value:"md:SingleLogoutService", name:"Single Logout Service", disabled : false},
		          {value:"md:ManageNameIDService", name:"Manage Name ID Service", disabled : false},
		          {value:"md:NameIDFormat", name:"Name ID Format", disabled : false},
		          {value:"md:SingleSignOnService", name:"Single Sign On Service", disabled : false},
		          {value:"md:NameIDMappingService", name:"Name ID Mapping Service", disabled : false},
		          {value:"md:AssertionIDRequestService", name:"Assertion ID Request Service", disabled : false},
		          {value:"md:AttributeProfile", name:"Attribute Profile", disabled : false},
		          {value:"saml:Attribute", name:"Attribute", disabled : false},
				],
				attributes : {
				  ID : {name : "ID", options : null,  value : "", required : false},
		          validUntil : {name : "Valid Until", options : null, value : "", required : false},
		          cacheDuration : {name : "Cache Duration", options : null, value : "", required : false},
		          protocolSupportEnumeration : {name : "Protocol Support Enumeration", options : null, value : "", required : true},
		          errorURL : {name : "Error URL", options : null, value : "", required : false},
		          WantAuthnRequestsSigned : {name : "Want Authn Requests Signed", options : options, value : "", required : false}
				}
			};
		},
		addChild : function(type){

			var node = null;
			
			switch (type) { 
			  case "md:Extensions":
			    break;
			  case "md:KeyDescriptor":
				node = new KeyDescriptor({parent : this});
				this.get("childs")[1].push(node);
				
			    break;
			  case "md:Organization":
				node = new Organization({parent : this});
				this.get("childs")[2] = node;
				this.get("options")[2].disabled = true;
				
			    break;
			  case "md:ContactPerson":
				node = new ContactPerson({parent : this});
				this.get("childs")[3].push(node);
				
			    break;
			  case "md:ArtifactResolutionService":
				node = new ArtifactResolutionService({parent : this});
				this.get("childs")[4].push(node);
				
			    break;
			  case "md:SingleLogoutService":
				node = new SingleLogoutService({parent : this});
				this.get("childs")[5].push(node);
				
			    break;
			  case "md:ManageNameIDService":
				node = new ManageNameIDService({parent : this});
				this.get("childs")[6].push(node);
				
			    break;
			  case "md:NameIDFormat":
				node = new NameIDFormat({parent : this});
				this.get("childs")[7].push(node);
				
			    break;
			  case "md:SingleSignOnService":
				node = new SingleSignOnService({parent : this});
				this.get("childs")[8].push(node);
				
			    break;
			  case "md:NameIDMappingService":
				node = new NameIDMappingService({parent : this});
				this.get("childs")[9].push(node);
				
			    break;
			  case "md:AssertionIDRequestService":
				node = new AssertionIDRequestService({parent : this});
				this.get("childs")[10].push(node);
				
			    break;
			  case "md:AttributeProfile":
				node = new AttributeProfile({parent : this});
				this.get("childs")[11].push(node);
				
			    break;
			  case "saml:Attribute":
				node = new Attribute({parent : this});
				this.get("childs")[12].push(node);
				
			    break;
			  default: 
				console.log("EntitiesDescriptor.addChild ==> Bad Child Type");
			    break;
			}			
			
			return node;
		},
		removeChild : function(childNode){
			switch (childNode.get("tag")) { 
			  case "md:Extensions":
				    break;
			  case "md:KeyDescriptor":
				var collection = new Backbone.Collection(this.get("childs")[1]);
				collection.remove(childNode);
				
				this.get("childs")[1] = collection.models;
			  case "md:Organization":
				this.get("childs")[2] = null;
				this.get("options")[2].disabled = false;
				
			    break;
			  case "md:ContactPerson":
				var collection = new Backbone.Collection(this.get("childs")[3]);
				collection.remove(childNode);
				
				this.get("childs")[3] = collection.models;
				
			    break;
			  case "md:ArtifactResolutionService":
				var collection = new Backbone.Collection(this.get("childs")[4]);
				collection.remove(childNode);
				
				this.get("childs")[4] = collection.models;
				
			    break;
			  case "md:SingleLogoutService":
				var collection = new Backbone.Collection(this.get("childs")[5]);
				collection.remove(childNode);
				
				this.get("childs")[5] = collection.models;
				
			    break;
			  case "md:ManageNameIDService":
				var collection = new Backbone.Collection(this.get("childs")[6]);
				collection.remove(childNode);
				
				this.get("childs")[6] = collection.models;
				
			    break;
			  case "md:NameIDFormat":
				var collection = new Backbone.Collection(this.get("childs")[7]);
				collection.remove(childNode);
				
				this.get("childs")[7] = collection.models;
				
			    break;
			  case "md:SingleSignOnService":
				var collection = new Backbone.Collection(this.get("childs")[8]);
				collection.remove(childNode);
				
				this.get("childs")[8] = collection.models;
			    break;
			  case "md:NameIDMappingService":
				var collection = new Backbone.Collection(this.get("childs")[9]);
				collection.remove(childNode);
				
				this.get("childs")[9] = collection.models;
			    break;
			  case "md:AssertionIDRequestService":
				var collection = new Backbone.Collection(this.get("childs")[10]);
				collection.remove(childNode);
				
				this.get("childs")[10] = collection.models;
			    break;
			  case "md:AttributeProfile":
				var collection = new Backbone.Collection(this.get("childs")[11]);
				collection.remove(childNode);
				
				this.get("childs")[11] = collection.models;

				break;
			  case "saml:Attribute":
				var collection = new Backbone.Collection(this.get("childs")[12]);
				collection.remove(childNode);
				
				this.get("childs")[12] = collection.models;

				break;
			  default: 
				console.log("EntitiesDescriptor.addChild ==> Bad Child Type");
			    break;
			}		
		},
		getParent : function(){
			return this.parent;
		}
	});
	
	return IDPSSODescriptor;
});