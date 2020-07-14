package com.mmm.erfe.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.nio.file.CopyOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.mmm.erfe.domain.CorpAttachment;
import com.mmm.erfe.domain.CorpPsRFE;
import com.mmm.erfe.repository.CorpAttachmentRepository;

/**
 * @author Sowmya
 *
 */
@Component
public class FileHandler {

	/**
	 * Dynamic object creation
	 * 
	 * @author Sowmya
	 * @param void
	 * @throws Nothing
	 * @return Object of CorpAttachmentRepository
	 *
	 */
	@Autowired
	public CorpAttachmentRepository corpAttachmentRepository;

	/**
	 * Saves the attachment and returns the same
	 * 
	 * @author Sowmya
	 * @param files-MultipartFile array,corpPsRFE-CorpPsRFE
	 * @throws Nothing
	 * @return attachmentList-Set<CorpAttachment>
	 *
	 */
	public Set<CorpAttachment> saveAttachment(MultipartFile[] files, CorpPsRFE corpPsRFE) {
		String fileSeparator = System.getProperty("file.separator");
		StringBuilder path = new StringBuilder();
		Set<CorpAttachment> attachmentList = new HashSet<>();
		try {
			path.append(System.getProperty("mmm.app.mount")).append(fileSeparator).append(corpPsRFE.getCorpPSReqNum()); // changed
			File folder = new File(path.toString());
			if (!folder.exists()) {
				if (folder.mkdirs()) {
					System.out.println("created successfully");
				} else {
					System.out.println("problem in creating folders");
				}
			}

			CopyOption[] options = new CopyOption[] { StandardCopyOption.REPLACE_EXISTING };
			CorpAttachment attachment = null;
			Path desPath = Paths.get(path.toString());
//              attachmentList = corpAttachmentRepository.findByDocId(corpPsRFE.getDocId()); 
			if (folder.exists()) {
				for (MultipartFile file : files) {
					attachment = new CorpAttachment();
					Files.copy(file.getInputStream(), desPath.resolve(file.getOriginalFilename()), options);
					attachment.setCreatedDate(new Date());
					attachment.setFileName(file.getOriginalFilename());
					attachment.setAttachmentType(file.getContentType());
//                           attachment.setCorpPsRFE(corpPsRFE);
					attachmentList.add(attachment);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return attachmentList;
	}

	/**
	 * Fetches the attachment and returns the same for download
	 * 
	 * @author Sowmya
	 * @param corpPSReqNum-String array,fileName-String
	 * @throws Nothing
	 * @return resource-Resource
	 *
	 */
	public Resource getFileForDownload(String corpPSReqNum, String fileName) {
		Resource resource = null;
		String fileSeparator = System.getProperty("file.separator");
		StringBuilder filePath = new StringBuilder();
		filePath.append(System.getProperty("mmm.app.mount")).append(fileSeparator).append(corpPSReqNum)
				.append(fileSeparator).append(fileName); // Changed
		try {
			Path path = Paths.get(filePath.toString());
			resource = new UrlResource(path.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				// throw new MyFileNotFoundException("File not found ");
			}
		} catch (MalformedURLException ex) {
			// throw new MyFileNotFoundException("File not found ", ex);
		}
		return resource;
	}

	/**
	 * Fetches the resourse and saves a copy for renewal
	 * 
	 * @author Senthil
	 * @param corpPsRFE-CorpPsRFE,oldCorpreq-String,attachments-CorpAttachment array
	 * @throws Nothing
	 * @return attachmentList-Set<CorpAttachment>
	 *
	 */
	public Set<CorpAttachment> saveCopy(CorpPsRFE corpPsRFE, String oldCorpreq, CorpAttachment[] attachments) {
		String fileSeparator = System.getProperty("file.separator");
		StringBuilder path = new StringBuilder();
		Set<CorpAttachment> attachmentList = new HashSet<>();

		try {
			path.append(System.getProperty("mmm.app.mount")).append(fileSeparator).append(corpPsRFE.getCorpPSReqNum()); // changed
			File folder = new File(path.toString());
			if (!folder.exists()) {
				if (folder.mkdirs()) {
					System.out.println("created successfully");
				} else {
					System.out.println("problem in creating folders");
				}
			}
			CopyOption[] options = new CopyOption[] { StandardCopyOption.REPLACE_EXISTING };
			CorpAttachment newAttachment = null;
			Path desPath = Paths.get(path.toString());

			for (CorpAttachment attachment : attachments) {

				Resource resource = this.getFileForDownload(oldCorpreq, attachment.getFileName());
				newAttachment=new CorpAttachment();
				Files.copy(resource.getInputStream(), desPath.resolve(attachment.getFileName()), options);
				newAttachment.setCreatedDate(new Date());
				newAttachment.setFileName(attachment.getFileName());
				newAttachment.setAttachmentType(attachment.getAttachmentType());
				attachmentList.add(newAttachment);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return attachmentList;

	}

}
